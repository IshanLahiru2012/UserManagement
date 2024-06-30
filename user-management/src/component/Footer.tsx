const Footer = () => {
    return (
        <footer className="flex bg-blue-500 justify-center text-white p-4 mt-auto">
            <p>&copy; {new Date().getFullYear()} My User Management Website</p>
        </footer>
    );
};

export default Footer;