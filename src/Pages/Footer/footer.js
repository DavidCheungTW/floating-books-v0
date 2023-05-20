import * as React from "react";
import "./footer.css";
const FooterSection = () => {
  return (
    <div className="footer">
      <p>
        &copy; {new Date().getFullYear()} Floating Books. All rights reserved.
      </p>
    </div>
  );
};

export default FooterSection;
