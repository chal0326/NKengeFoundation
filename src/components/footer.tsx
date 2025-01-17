import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <span className="text-xl font-bold">Nkenge Foundation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering communities through education and sustainable development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-sm text-muted-foreground hover:text-primary">Scholarship Program</a></li>
              <li><a href="#programs" className="text-sm text-muted-foreground hover:text-primary">Literacy Initiative</a></li>
              <li><a href="#programs" className="text-sm text-muted-foreground hover:text-primary">Community Centers</a></li>
              <li><a href="#programs" className="text-sm text-muted-foreground hover:text-primary">Mentorship Program</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><a href="#get-involved" className="text-sm text-muted-foreground hover:text-primary">Make a Donation</a></li>
              <li><a href="#get-involved" className="text-sm text-muted-foreground hover:text-primary">Volunteer</a></li>
              <li><a href="#get-involved" className="text-sm text-muted-foreground hover:text-primary">Partner With Us</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" className="text-sm text-muted-foreground hover:text-primary">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-sm text-muted-foreground hover:text-primary">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-sm text-muted-foreground hover:text-primary">Instagram</a></li>
              <li><a href="https://linkedin.com" className="text-sm text-muted-foreground hover:text-primary">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Nkenge Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}