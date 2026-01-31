import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 flex items-center gap-4 text-red-800">
                    <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-bold">Something went wrong showing the map</h3>
                        <p className="text-sm text-red-600 mt-1">Please try refreshing the page.</p>
                        <p className="text-xs text-red-400 mt-1 font-mono">{this.state.error?.message}</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
