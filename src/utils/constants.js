export const CATEGORIES = [
    { id: 'shirts', name: 'Shirts', path: '/category/shirts' },
    { id: 'shoes', name: 'Shoes', path: '/category/shoes' },
    { id: 'accessories', name: 'Accessories', path: '/category/accessories' },
];

export const NAV_LINKS = [
    { name: 'New Arrivals', path: '/new' },
    { name: 'Shirts', path: '/category/shirts', hasMega: true },
    { name: 'Shoes', path: '/category/shoes', hasMega: true },
    { name: 'Accessories', path: '/category/accessories', hasMega: true },
    { name: 'Sale', path: '/sale' },
];

export const FOOTER_LINKS = {
    shop: [
        { name: 'New Arrivals', path: '/new' },
        { name: 'Shirts', path: '/category/shirts' },
        { name: 'Shoes', path: '/category/shoes' },
        { name: 'Accessories', path: '/category/accessories' },
        { name: 'Sale', path: '/sale' },
    ],
    help: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Shipping & Returns', path: '/shipping' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'FAQ', path: '/faq' },
    ],
    company: [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
    ],
};
