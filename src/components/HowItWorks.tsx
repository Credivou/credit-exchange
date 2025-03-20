
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Create Your Account",
    description: "Sign up for an account to start posting or browsing available credit card offers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: "Post Your Offer",
    description: "List your exclusive credit card invitation with details about rewards and benefits.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <line x1="12" x2="12" y1="8" y2="16"></line>
        <line x1="8" x2="16" y1="12" y2="12"></line>
      </svg>
    )
  },
  {
    id: 3,
    title: "Connect with Buyers",
    description: "Our secure platform helps you find interested parties for your offer.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: "Complete the Exchange",
    description: "Finalize the transaction securely and earn money from your unused invite.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    )
  }
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  return (
    <section className="py-24 relative" id="how-it-works">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-off-white"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-soft-blue text-medium-blue rounded-full text-xs font-medium tracking-wide mb-4">
            Simple & Secure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How CreditExchange Works</h2>
          <p className="text-gray-600">
            Our platform makes it easy to share and acquire exclusive credit card offers in just a few simple steps
          </p>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-medium-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
