import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex h-16 items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {currentYear} Artisan Bakery. All rights reserved.</p>
        <nav>
          <Link to="#" className="hover:text-primary transition-colors">
            Help & Support
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default AppFooter;