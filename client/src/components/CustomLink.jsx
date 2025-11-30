import { Link, useMatch } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link
      to={to}
      style={{
        color: match ? '#d36c27' : '#adb5d8',
        textDecoration: match ? 'underline' : '',
      }}
      {...props}>
      {children}
    </Link>
  );
};

export { CustomLink };
