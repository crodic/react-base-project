import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IProvidersProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

/**
 * Renders the Providers component, which wraps the children components with necessary providers.
 *
 * @param {IProvidersProps} props - The props object containing the children component.
 * @return {JSX.Element} The rendered Providers component.
 */
const Providers: FC<IProvidersProps> = ({ children }) => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                {children}
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default Providers;
