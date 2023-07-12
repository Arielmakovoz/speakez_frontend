const Logo: React.FC<{
  size?: string;
  color?: string;
  inherit?: boolean;
  highlight?: boolean;
}> = ({ size = "1rem" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 150"
      fill="none"
    >
      <path
        strokeWidth="12"
        stroke="#000000"
        className="fill-highlight"
        d="m102.15482,6.38606c-50.41601,0 -91.28572,30.7655 -91.28572,68.71547c0,12.96861 4.83165,25.08378 13.14559,35.42877l-13.14559,28.92581l36.59886,-9.43141c15.25117,8.61985 34.14752,13.78994 54.68686,13.78994c50.41606,0 91.28574,-30.76553 91.28574,-68.71312c0,-37.94997 -40.86967,-68.71547 -91.28574,-68.71547l0,0.00001z"
      />
      <path
        d="m142.44823,58.85272c-8.99375,0 -8.4375,19.614 -12.68125,28.497c-0.7125,1.477 -2.65625,1.288 -3.125,-0.308c-4.81875,-16.548 -2.61875,-56.756 -15.6875,-56.756c-13.68125,0 -10.3,52.031 -15.625,73.234c-0.39375,1.61 -2.38125,1.75 -2.9625,0.196c-5.625,-15.127 -4.99375,-48.125 -15.6375,-48.125c-11.0125,0 -10.075,27.643 -14.3875,38.78c-0.56875,1.491 -2.45,1.54 -3.08125,0.07c-3.14375,-7.343 -4.15,-22.155 -16.025,-22.155l-13.83125,0c-1.71875,0 -3.11875,1.568 -3.11875,3.493s1.4,3.507 3.11875,3.507l13.83125,0c9.825,0 6.4875,24.388 17.8375,24.388c10.525,0 9.3875,-26.53 13.89375,-38.29c0.55,-1.456 2.3875,-1.414 2.9125,0.042c5.03125,14.329 4.9375,48.86 16.50625,48.86c12.98125,0 8.35625,-54.992 15.26875,-74.347c0.51875,-1.477 2.4,-1.554 2.99375,-0.084c6.43125,15.75 3.04375,56.882 14.65,56.882c10.24375,0 10.85625,-18.942 13.9375,-28.266c0.50625,-1.484 2.33125,-1.589 2.9625,-0.189c3.225,7.007 5.2875,18.004 15,18.004l13.96875,0c1.71875,0 3.11875,-1.568 3.11875,-3.493c0,-1.932 -1.4,-3.5 -3.11875,-3.5l-13.96875,0c-8.26875,0 -6.98125,-20.44 -16.75,-20.44z"
        fill="black"
      />
    </svg>
  );
};

export default Logo;
