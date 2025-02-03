import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container flex flex-sb flex-wrap flex-left">
          <div className="footer_logo">
            <h2>Shoepedi Blog</h2>
            <h4>&copy; 2025 All rights reserved</h4>
            <h4>
              Made with{" "}
              <span>
                <Link href="/">@Vin Rain</Link>
              </span>
            </h4>
          </div>
          <div className="q_links">
            <h3>Quick links</h3>
            <ul>
              <li>
                <Link href="/">Advertise with us</Link>
              </li>
              <li>
                <Link href="/">About us</Link>
              </li>
              <li>
                <Link href="/">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="q_links">
            <h3>Legal links</h3>
            <ul>
              <li>
                <Link href="/">Privacy notice</Link>
              </li>
              <li>
                <Link href="/">Cookie policy</Link>
              </li>
              <li>
                <Link href="/">Terms and conditions</Link>
              </li>
            </ul>
          </div>
          <div className="q_links">
            <h3>Social media</h3>
            <ul>
              <li>
                <Link href="/">Facebook</Link>
              </li>
              <li>
                <Link href="/">Instagram</Link>
              </li>
              <li>
                <Link href="/">Tiktok</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
