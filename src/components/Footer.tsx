
import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [{
    title: "Company",
    links: [{
      name: "About Us",
      path: "/about"
    }, {
      name: "Careers",
      path: "/careers"
    }, {
      name: "Press",
      path: "/press"
    }, {
      name: "Contact",
      path: "/contact"
    }]
  }, {
    title: "Platform",
    links: [{
      name: "How It Works",
      path: "/about"
    }, {
      name: "Browse Listings",
      path: "/listings"
    }, {
      name: "Post an Offer",
      path: "/post"
    }, {
      name: "Pricing",
      path: "/pricing"
    }]
  }, {
    title: "Resources",
    links: [{
      name: "Blog",
      path: "/blog"
    }, {
      name: "FAQ",
      path: "/faq"
    }, {
      name: "Support",
      path: "/support"
    }, {
      name: "Terms of Service",
      path: "/terms"
    }]
  }];
  return <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-medium-blue font-bold text-3xl">Credivou</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">The secure marketplace for exchanging premium credit card offers. Connect with buyers and sellers looking for exclusive offers. </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-soft-blue hover:text-medium-blue transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-soft-blue hover:text-medium-blue transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-soft-blue hover:text-medium-blue transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-soft-blue hover:text-medium-blue transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          {footerLinks.map(section => <div key={section.title}>
              <h3 className="font-semibold text-sm text-gray-800 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => <li key={link.name}>
                    <Link to={link.path} className="text-gray-600 hover:text-medium-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Credivou. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-medium-blue text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-medium-blue text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-medium-blue text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
