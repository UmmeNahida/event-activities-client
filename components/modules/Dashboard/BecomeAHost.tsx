"use client"

import { getUserInfo } from "@/services/auth/getUserInfo";
import { promoteToHost } from "@/services/host/hostApiService";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function BecomeHostButtonDashboard() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToHostRequest = async () => {
    setLoading(true);
    
    setTimeout(async() => { 
      setLoading(false);
         const user = await getUserInfo()
        // console.log("kire re dong koroch:",user)
        if (user && user.email) {
            const res = await promoteToHost(user?.email)
            if(res.success && res.message){
                toast.success(res.message)
            }else{
                toast.error(res.error.message || res.message || "your request is failed")
            }
            console.log(res)
        }else{
            toast.error("please login first before request")
            redirect('/login')
        }
    }, 900);
  }

  return (
    <div className="max-w-full mx-auto p-4">
      {/* Dashboard card */}
      <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Become a Host</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Share experiences, make earnings, and manage events from your dashboard. It only takes a few minutes to get started.
          </p>

          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500 dark:text-slate-400">
            <li>• Fast payouts</li>
            <li>• Tools to manage bookings</li>
            <li>• Promotion & analytics</li>
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-3">
          {/* Primary large button for desktop */}
          <button
            onClick={() => setOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="become-host-modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M10 2a2 2 0 00-2 2v3H5a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-3V4a2 2 0 00-2-2z" />
            </svg>
            Become a Host
          </button>

          {/* Compact button for mobile */}
          <button
            onClick={() => setOpen(true)}
            className="sm:hidden inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
            aria-label="Become a host"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M10 2a2 2 0 00-2 2v3H5a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-3V4a2 2 0 00-2-2z" />
            </svg>
            Host
          </button>

          {/* Secondary subtle link for users who want more info */}
          <button
            onClick={() => window.open('#host-guidelines', '_self')}
            className="text-xs text-slate-600 dark:text-slate-300 underline hover:text-slate-800"
            aria-label="Read host guidelines"
          >
            Read host guidelines
          </button>
        </div>
      </div>

      {/* Onboarding Modal (simple) */}
      {open && (
        <div
          id="become-host-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />

          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-2xl w-full p-6 z-10">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Start hosting</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Quick steps to set up your first event and start earning.</p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close dialog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </header>

            <main className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <strong className="block">Why host?</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Earn money, build reputation, and host on your own schedule. We'll handle payments and bookings.</p>
                </div>

                <ol className="mt-2 list-decimal list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Create your first event (title, price, capacity).</li>
                  <li>Set dates & availability.</li>
                  <li>Publish and promote — we show it to local users.</li>
                </ol>

                <div className="mt-3">
                  <button
                    onClick={handleToHostRequest}
                    disabled={loading}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${loading ? 'opacity-70 cursor-wait' : ''} bg-indigo-600 text-white`}
                  >
                    {loading ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2"></circle>
                        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4"></path>
                      </svg>
                    ) : null}
                    {loading ? 'Starting...' : 'Start onboarding'}
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="ml-3 text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    Maybe later
                  </button>
                </div>
              </div>

              <aside className="p-3 border-l border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Host checklist</h4>
                <ul className="mt-2 text-sm text-slate-600 dark:text-slate-300 space-y-2">
                  <li>• Valid photo and profile</li>
                  <li>• Bank / payout setup</li>
                  <li>• Short event description</li>
                  <li>• Refund & safety policy</li>
                </ul>

                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  Tip: You can draft an event and save — it won't be published until you confirm.
                </div>
              </aside>
            </main>

            <footer className="mt-6 text-right">
              <button onClick={() => setOpen(false)} className="text-sm px-3 py-2 rounded-md">Close</button>
            </footer>
          </div>
        </div>
      )}

      {/* Anchor target for host guidelines (for the subtle link) */}
      <div id="host-guidelines" className="sr-only">Host guidelines placeholder (replace with actual content)</div>
    </div>
  );
}
