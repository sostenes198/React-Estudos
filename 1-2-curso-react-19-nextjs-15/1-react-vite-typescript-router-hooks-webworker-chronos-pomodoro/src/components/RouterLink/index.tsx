import {Link} from 'react-router';
import * as React from 'react';

type RouterLinkProps = {
    children: React.ReactNode;
    href: string;
} & React.ComponentProps<'a'>

export function RouterLink({children, href, ...props}: RouterLinkProps) {
    return (
        <Link to={href} {...props}>{children}</Link>
    );
}