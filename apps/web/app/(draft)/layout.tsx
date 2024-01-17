import { TopBar } from "../../components/top-bar";
import "../../styles/globals.css"; 
import "material-icons/iconfont/material-icons.css"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Draft</title>
      </head>
      <body className={"bg-[#F8F8F8]"}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
