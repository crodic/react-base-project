import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './useSession';

/**
 * Returns a higher-order component that wraps the provided component with authentication logic.
 *
 * @param {ComponentType} WrappedComponent - The component to be wrapped with authentication logic.
 * @return {ReactElement} The wrapped component with authentication logic.
 */
const withAuth = (WrappedComponent: ComponentType) => {
    const WithAuthComponent = (props: any) => {
        const isAuthenticated = useSession((state) => state.isLoggedIn);

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuthComponent;
};

export default withAuth;
