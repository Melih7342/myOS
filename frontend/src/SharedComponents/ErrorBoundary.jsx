import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-5">
          <h1>Etwas ist schiefgelaufen</h1>
          <p>Bitte Seite neu laden oder später versuchen.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
