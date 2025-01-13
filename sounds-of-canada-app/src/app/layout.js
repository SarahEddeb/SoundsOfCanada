import { Provider } from "@/components/ui/provider";

/**
 * Layout component that wraps its children with a Provider for theme management.
 * 
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * 
 * @returns {JSX.Element} The HTML structure with a body containing the Provider component.
 */
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
