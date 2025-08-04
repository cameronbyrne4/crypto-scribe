import React from 'react';

const SimpleDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ChainQuery AI Demo
          </h1>
          <p className="text-xl text-gray-300">
            Blockchain Investigation: Wallet 5mHH…BrTy on Solana
          </p>
        </div>

        {/* Demo Content */}
        <div className="space-y-8">
          {/* Query */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Investigation Query</h3>
            <p className="text-gray-300 text-lg">
              "investigating wallet 5mHH…BrTy on Solana. Where did its funds originate, how were they bridged, and what patterns are suspicious?"
            </p>
          </div>

          {/* Flow Analysis */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Cross-Chain Fund Flow</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-500/10 p-4 rounded-lg">
                <span className="font-mono text-sm">0xEa7d… (Binance Hot Wallet - Base)</span>
                <span className="text-green-400">$120K USDC</span>
              </div>
              <div className="text-center text-gray-400">↓</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-500/10 p-4 rounded-lg">
                  <div className="font-mono text-sm text-orange-300">0x3c4b… (Burner A)</div>
                  <div className="text-sm text-gray-400">$55K USDC</div>
                </div>
                <div className="bg-orange-500/10 p-4 rounded-lg">
                  <div className="font-mono text-sm text-orange-300">0x7e9f… (Burner B)</div>
                  <div className="text-sm text-gray-400">$65K USDC</div>
                </div>
              </div>
              <div className="text-center text-gray-400">↓</div>
              <div className="bg-purple-500/10 p-4 rounded-lg text-center">
                <div className="text-purple-300 mb-1">Wormhole Bridge</div>
                <div className="text-sm text-gray-400">Base → Solana</div>
              </div>
              <div className="text-center text-gray-400">↓</div>
              <div className="bg-red-500/10 p-4 rounded-lg text-center">
                <div className="font-mono text-red-300">5mHH…BrTy (Solana)</div>
                <div className="text-green-400 font-semibold">$110K USDC Received</div>
              </div>
            </div>
          </div>

          {/* Transaction Analysis */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Transaction Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <div className="text-green-300 font-semibold">$27,500 → PEPE</div>
                  <div className="text-xs text-gray-400">via Raydium DEX</div>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <div className="text-green-300 font-semibold">$31,200 → BONK</div>
                  <div className="text-xs text-gray-400">via Jupiter DEX</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <div className="text-green-300 font-semibold">$25,800 → WIF</div>
                  <div className="text-xs text-gray-400">via Orca DEX</div>
                </div>
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <div className="text-yellow-300 font-semibold">MEV Interactions</div>
                  <div className="text-xs text-gray-400">2 transactions, $2,130 profit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-500/20 border border-red-500/30 p-4 rounded-lg">
                <div className="text-red-300 font-semibold mb-2">Likely Coordination</div>
                <div className="text-2xl font-bold text-red-400">89%</div>
                <div className="text-xs text-gray-400 mt-1">High Risk</div>
              </div>
              <div className="bg-red-500/20 border border-red-500/30 p-4 rounded-lg">
                <div className="text-red-300 font-semibold mb-2">High Velocity Buyer</div>
                <div className="text-2xl font-bold text-red-400">94%</div>
                <div className="text-xs text-gray-400 mt-1">High Risk</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 p-4 rounded-lg">
                <div className="text-yellow-300 font-semibold mb-2">Bridge Funnel</div>
                <div className="text-2xl font-bold text-yellow-400">87%</div>
                <div className="text-xs text-gray-400 mt-1">Medium Risk</div>
              </div>
            </div>
          </div>

          {/* Final Analysis */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">AI Analysis Summary</h3>
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-green-300 font-semibold mb-2">Key Finding</div>
                <p className="text-gray-200">
                  Origin traced to Binance via 2 burner wallets (Base). Confidence: 92%.
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-red-300 font-semibold mb-2">Pattern Match</div>
                <p className="text-gray-200">
                  This wallet shares funding pattern with 3 other tagged wallets. Behavior matches known memecoin rotation ring.
                </p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="text-2xl font-bold text-purple-400">Overall Risk: HIGH</div>
                <div className="text-2xl font-bold text-green-400">Confidence: 92%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>ChainQuery AI - Ask anything. Investigate everything.</p>
          <div className="mt-4">
            <a href="/" className="text-blue-400 hover:text-blue-300 underline mr-4">← Back to Home</a>
            <a href="/demo" className="text-purple-400 hover:text-purple-300 underline">Animated Demo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDemoPage;
