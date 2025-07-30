import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Globe, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="h-full bg-black/[0.96] p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-[#7c45eb]" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-300">
            Manage your account preferences and application settings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-[#7c45eb]" />
              <h2 className="text-xl font-semibold text-white">Account</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-gray-400 text-sm">Receive updates about your queries</p>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Query Alerts</p>
                  <p className="text-gray-400 text-sm">Get notified when queries complete</p>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Weekly Reports</p>
                  <p className="text-gray-400 text-sm">Receive weekly usage summaries</p>
                </div>
                <Switch disabled />
              </div>
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#7c45eb]" />
              <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Data Retention</p>
                  <p className="text-gray-400 text-sm">Keep query history for 30 days</p>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Analytics</p>
                  <p className="text-gray-400 text-sm">Help improve Nous with usage data</p>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Two-Factor Auth</p>
                  <p className="text-gray-400 text-sm">Enhanced account security</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Configure
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Display Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-[#7c45eb]" />
              <h2 className="text-xl font-semibold text-white">Display</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Use dark theme (always enabled)</p>
                </div>
                <Switch checked disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Compact View</p>
                  <p className="text-gray-400 text-sm">Show more data in tables</p>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Animations</p>
                  <p className="text-gray-400 text-sm">Enable smooth transitions</p>
                </div>
                <Switch disabled />
              </div>
            </div>
          </motion.div>

          {/* API Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-[#7c45eb]" />
              <h2 className="text-xl font-semibold text-white">API & Integrations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">API Access</p>
                  <p className="text-gray-400 text-sm">Programmatic access to Nous</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Manage Keys
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Webhooks</p>
                  <p className="text-gray-400 text-sm">Receive real-time notifications</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Export Data</p>
                  <p className="text-gray-400 text-sm">Download your query results</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Export
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-[#7c45eb]/10 border border-[#7c45eb]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#7c45eb] mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-300">
              Advanced settings and customization options will be available as the platform develops.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage; 