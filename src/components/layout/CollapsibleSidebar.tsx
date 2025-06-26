import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  BookHeart,
  CalendarClock,
  ClipboardList,
  Truck,
  PanelLeftClose,
  PanelLeftOpen,
  Wheat,
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/recipe-management', icon: BookHeart, label: 'Recipes' },
  { to: '/baking-schedule', icon: CalendarClock, label: 'Schedule' },
  { to: '/inventory-tracking', icon: ClipboardList, label: 'Inventory' },
  { to: '/order-fulfillment', icon: Truck, label: 'Orders' },
];

const CollapsibleSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log('CollapsibleSidebar loaded');

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      { 'bg-muted text-primary': isActive },
      { 'justify-center': isCollapsed }
    );

  return (
    <aside
      className={cn(
        'hidden border-r bg-muted/40 md:flex md:flex-col fixed h-full z-40 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center border-b px-4 lg:px-6 justify-between">
         {!isCollapsed && (
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Wheat className="h-6 w-6 text-amber-600" />
              <span>Artisan Bakery</span>
          </NavLink>
         )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Tooltip key={to} delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink to={to} className={navLinkClasses}>
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="font-medium">{label}</span>}
                <span className="sr-only">{label}</span>
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>{label}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default CollapsibleSidebar;