import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface FlowDiagramProps {
  data: any;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: 'wallet' | 'bridge' | 'chain' | 'dex';
  name: string;
  size: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  amount: string;
  timestamp: string;
  suspicious: boolean;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const simulationRef = useRef<d3.Simulation<Node, undefined> | null>(null);
  const zoomRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const showNodeCard = (node: Node) => {
    setSelectedNode(node);
  };

  const hideNodeCard = () => {
    setSelectedNode(null);
  };

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Transform data into nodes and links
    const nodes: Node[] = [];
    const links: Link[] = [];
    const nodeMap = new Map<string, Node>();
    
    // Store nodes in ref for reset functionality
    nodesRef.current = nodes;

    // Add target wallet
    const targetWallet: Node = {
      id: data.wallet_address,
      type: 'wallet',
      name: data.wallet_address,
      size: 20,
      color: '#7c45eb'
    };
    nodes.push(targetWallet);
    nodeMap.set(targetWallet.id, targetWallet);

    // Add source wallets from fund origins
    data.fund_origins?.forEach((origin: any) => {
      const sourceWallet: Node = {
        id: origin.source_wallet,
        type: 'wallet',
        name: origin.source_wallet,
        size: 15,
        color: '#F87171'
      };
      if (!nodeMap.has(sourceWallet.id)) {
        nodes.push(sourceWallet);
        nodeMap.set(sourceWallet.id, sourceWallet);
      }

      // Add bridge
      const bridge: Node = {
        id: origin.bridge_protocol,
        type: 'bridge',
        name: origin.bridge_protocol,
        size: 12,
        color: '#4F46E5'
      };
      if (!nodeMap.has(bridge.id)) {
        nodes.push(bridge);
        nodeMap.set(bridge.id, bridge);
      }

      // Add links
      links.push({
        source: origin.source_wallet,
        target: origin.bridge_protocol,
        amount: origin.amount,
        timestamp: origin.timestamp,
        suspicious: origin.risk_indicator === 'High'
      });

      links.push({
        source: origin.bridge_protocol,
        target: data.wallet_address,
        amount: origin.amount,
        timestamp: origin.timestamp,
        suspicious: origin.risk_indicator === 'High'
      });
    });

    // Add bridge activity
    data.bridge_activity?.forEach((activity: any) => {
      // Add chains
      const fromChain: Node = {
        id: activity.from_chain,
        type: 'chain',
        name: activity.from_chain,
        size: 10,
        color: '#8A8A93'
      };
      if (!nodeMap.has(fromChain.id)) {
        nodes.push(fromChain);
        nodeMap.set(fromChain.id, fromChain);
      }

      const toChain: Node = {
        id: activity.to_chain,
        type: 'chain',
        name: activity.to_chain,
        size: 10,
        color: '#8A8A93'
      };
      if (!nodeMap.has(toChain.id)) {
        nodes.push(toChain);
        nodeMap.set(toChain.id, toChain);
      }

      // Add bridge if not already added
      const bridge: Node = {
        id: activity.bridge,
        type: 'bridge',
        name: activity.bridge,
        size: 12,
        color: '#4F46E5'
      };
      if (!nodeMap.has(bridge.id)) {
        nodes.push(bridge);
        nodeMap.set(bridge.id, bridge);
      }

      // Add links
      links.push({
        source: activity.from_chain,
        target: activity.bridge,
        amount: activity.amount,
        timestamp: activity.timestamp,
        suspicious: false
      });

      links.push({
        source: activity.bridge,
        target: activity.to_chain,
        amount: activity.amount,
        timestamp: activity.timestamp,
        suspicious: false
      });
    });

    // Add recent activity (DEX interactions)
    data.recent_activity?.forEach((activity: any) => {
      if (activity.action === 'Token Swap') {
        const dex: Node = {
          id: activity.dex,
          type: 'dex',
          name: activity.dex,
          size: 8,
          color: '#33D69F'
        };
        if (!nodeMap.has(dex.id)) {
          nodes.push(dex);
          nodeMap.set(dex.id, dex);
        }

        links.push({
          source: data.wallet_address,
          target: activity.dex,
          amount: activity.amount,
          timestamp: activity.timestamp,
          suspicious: activity.suspicious
        });
      }
    });

    // Set up D3
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);
    zoomRef.current = zoom;

    // Create a group for all elements
    const g = svg.append('g');

    // Create arrow markers for different colors
    const createArrowMarker = (color: string, id: string) => {
      svg.append('defs').append('marker')
        .attr('id', id)
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 10)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', color);
    };

    // Create arrow markers for different link colors
    createArrowMarker('#F87171', 'arrowhead-red');
    createArrowMarker('#4F46E5', 'arrowhead-blue');

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.size + 10));
    
    // Store simulation in ref for reset functionality
    simulationRef.current = simulation;

    // Create curved links using path generator
    const linkPath = d3.line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(d3.curveBasis);

    // Create invisible wider paths for better hover detection
    const linkHover = g.append('g')
      .selectAll('path')
      .data(links)
      .enter().append('path')
      .attr('stroke', 'transparent')
      .attr('stroke-width', 12)
      .attr('fill', 'none')
      .style('pointer-events', 'all');

    const link = g.append('g')
      .selectAll('path')
      .data(links)
      .enter().append('path')
      .attr('stroke', (d: any) => d.suspicious ? '#F87171' : '#4F46E5')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('marker-end', (d: any) => d.suspicious ? 'url(#arrowhead-red)' : 'url(#arrowhead-blue)')
      .style('opacity', 0.6)
      .style('pointer-events', 'none'); // Disable pointer events on visible path

    // Create nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', (d: any) => d.size)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add labels with background and hover behavior
    const labelGroup = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g');

    // Add background rectangle for labels
    const labelBg = labelGroup.append('rect')
      .attr('x', -30)
      .attr('y', (d: any) => d.size + 5)
      .attr('width', 60)
      .attr('height', 20)
      .attr('fill', 'rgba(0, 0, 0, 0.8)')
      .attr('rx', 4)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Add text labels
    const label = labelGroup.append('text')
      .text((d: any) => d.name.length > 10 ? d.name.substring(0, 10) + '...' : d.name)
      .attr('x', 0)
      .attr('y', (d: any) => d.size + 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '11px')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Add hover effects to nodes
    node.on('mouseenter', function(event: any, d: any) {
      labelBg.style('opacity', 1);
      label.style('opacity', 1);
    }).on('mouseleave', function(event: any, d: any) {
      labelBg.style('opacity', 0);
      label.style('opacity', 0);
    }).on('click', function(event: any, d: any) {
      // Handle node click - show detailed info and highlight connections
      console.log('Node clicked:', d);
      
      // Highlight connected nodes and links
      link.style('opacity', (l: any) => 
        l.source.id === d.id || l.target.id === d.id ? 1 : 0.2
      );
      
      node.style('opacity', (n: any) => 
        n.id === d.id || 
        links.some((l: any) => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        ) ? 1 : 0.3
      );

      // Show node labels for connected nodes
      label.style('opacity', (n: any) => 
        n.id === d.id || 
        links.some((l: any) => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        ) ? 1 : 0
      );
      labelBg.style('opacity', (n: any) => 
        n.id === d.id || 
        links.some((l: any) => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        ) ? 1 : 0
      );

      // Show detailed node card
      showNodeCard(d);
    });

    // Add click handler to SVG background to deselect
    svg.on('click', function(event: any) {
      // Only deselect if clicking on the background (not on nodes or links)
      if (event.target === svg.node()) {
        // Reset all nodes and links to normal opacity
        link.style('opacity', 0.6);
        node.style('opacity', 1);
        label.style('opacity', 0);
        labelBg.style('opacity', 0);
        hideNodeCard();
      }
    });

    // Node tooltips removed - using detailed cards instead

    // Create tooltip container
    const tooltip = d3.select('body').append('div')
      .attr('class', 'flow-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.9)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('border', '1px solid rgba(255, 255, 255, 0.2)')
      .style('backdrop-filter', 'blur(8px)')
      .style('opacity', 0)
      .style('transition', 'opacity 0.2s');

    // Add hover effects for links with detailed tooltips
    linkHover.on('mouseenter', function(event: any, d: any) {
      // Make the hovered edge brighter/more opaque
      link.filter((l: any) => l === d).style('opacity', 1);
      
      const tooltipContent = `
        <div style="font-weight: 600; margin-bottom: 4px;">Transaction Details</div>
        <div style="margin-bottom: 2px;"><strong>Amount:</strong> ${d.amount}</div>
        <div style="margin-bottom: 2px;"><strong>From:</strong> ${d.source.name}</div>
        <div style="margin-bottom: 2px;"><strong>To:</strong> ${d.target.name}</div>
        <div style="margin-bottom: 2px;"><strong>Time:</strong> ${new Date(d.timestamp).toLocaleString()}</div>
        ${d.suspicious ? '<div style="color: #F87171; font-weight: 600;">⚠️ Suspicious Activity</div>' : ''}
      `;
      
      tooltip.html(tooltipContent)
        .style('opacity', 1)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    })
    .on('mousemove', function(event: any) {
      tooltip
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    })
    .on('mouseleave', function(event: any, d: any) {
      // Reset edge opacity on mouse leave
      link.filter((l: any) => l === d).style('opacity', 0.6);
      tooltip.style('opacity', 0);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      const updatePath = (d: any) => {
        // Create a curved path between source and target
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate the radius of the target node
        const targetRadius = d.target.size || 10;
        
        // Calculate the point where the path should end (slightly beyond the edge of the target node)
        const angle = Math.atan2(dy, dx);
        const endX = d.target.x - (targetRadius + 2) * Math.cos(angle);
        const endY = d.target.y - (targetRadius + 2) * Math.sin(angle);
        
        // Create control points for smooth curve
        const midX = (d.source.x + endX) / 2;
        const midY = (d.source.y + endY) / 2;
        const offset = Math.min(dr * 0.3, 30); // Curve intensity
        
        // Create curved path ending at node edge
        return `M ${d.source.x} ${d.source.y} Q ${midX} ${midY - offset} ${endX} ${endY}`;
      };

      // Update both visible and invisible paths
      link.attr('d', updatePath);
      linkHover.attr('d', updatePath);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labelGroup
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup function
    return () => {
      simulation.stop();
      // Remove tooltip from DOM
      d3.select('.flow-tooltip').remove();
    };
  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full h-full border border-white/10 rounded-lg bg-black/20 relative">
        <svg 
          ref={svgRef} 
          className="w-full h-full max-w-full max-h-full"
          style={{ minHeight: '400px' }}
        />
        <button
          onClick={() => {
            if (svgRef.current && zoomRef.current) {
              const svg = d3.select(svgRef.current);
              // Reset zoom and pan using D3's zoom API
              svg.transition().duration(750).call(
                zoomRef.current.transform,
                d3.zoomIdentity
              );
              
              // Reset node positions by clearing fixed positions
              nodesRef.current.forEach(node => {
                node.fx = null;
                node.fy = null;
              });
              
              // Restart simulation to re-arrange nodes
              if (simulationRef.current) {
                simulationRef.current.alpha(1).restart();
              }
            }
          }}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors backdrop-blur-sm border border-white/20 z-10"
        >
          Reset View
        </button>
      </div>
      
      {/* Node Detail Card */}
      {selectedNode && (
        <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-sm z-20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-lg">{selectedNode.name}</h3>
            <button
              onClick={hideNodeCard}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedNode.color }}
              />
              <span className="text-gray-300 capitalize">{selectedNode.type}</span>
            </div>
            
            {selectedNode.type === 'wallet' && (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">Risk Level:</span>
                  <div className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-medium">
                    ⚠️ High Risk
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-gray-300">
                    <span className="font-medium">Funds In:</span>
                    <div className="ml-2 text-xs space-y-1">
                      <div>• $2.4M USDC from Ethereum Bridge</div>
                      <div>• $850K USDT from Binance Hot Wallet</div>
                    </div>
                  </div>
                  
                  <div className="text-gray-300">
                    <span className="font-medium">Funds Out:</span>
                    <div className="ml-2 text-xs space-y-1">
                      <div>• $125K BONK to Raydium</div>
                      <div>• $89K JUP to Orca</div>
                      <div>• $500K USDC to Ethereum</div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {selectedNode.type === 'bridge' && (
              <div className="space-y-2">
                <div className="text-gray-300">
                  <span className="font-medium">Protocol:</span> {selectedNode.name}
                </div>
                <div className="text-gray-300">
                  <span className="font-medium">Recent Activity:</span>
                  <div className="ml-2 text-xs space-y-1">
                    <div>• $2.4M USDC: Ethereum → Solana</div>
                    <div>• $850K USDT: BSC → Solana</div>
                    <div>• $500K USDC: Solana → Ethereum</div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedNode.type === 'chain' && (
              <div className="space-y-2">
                <div className="text-gray-300">
                  <span className="font-medium">Network:</span> {selectedNode.name}
                </div>
                <div className="text-gray-300">
                  <span className="font-medium">Activity:</span>
                  <div className="ml-2 text-xs space-y-1">
                    <div>• Source of $2.4M USDC transfer</div>
                    <div>• Destination of $500K USDC transfer</div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedNode.type === 'dex' && (
              <div className="space-y-2">
                <div className="text-gray-300">
                  <span className="font-medium">Exchange:</span> {selectedNode.name}
                </div>
                <div className="text-gray-300">
                  <span className="font-medium">Recent Swaps:</span>
                  <div className="ml-2 text-xs space-y-1">
                    <div>• $125K BONK swap (suspicious)</div>
                    <div>• $89K JUP swap (suspicious)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowDiagram; 