export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold font-amiri text-secondary">
              Manhaj.ai
            </h3>
            <p className="text-sm text-primary-foreground/70 mt-1">
              Preserving Knowledge, Connecting Hearts.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-secondary">
              About Us
            </a>
            <a
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-secondary">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-secondary">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-4 text-center text-xs text-primary-foreground/50">
          &copy; {new Date().getFullYear()} Manhaj.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
