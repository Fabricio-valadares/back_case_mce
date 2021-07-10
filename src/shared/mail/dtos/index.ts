interface IDataEmail {
  to: string;
  path: string;
  variable: {
    name: string;
    link: string;
  };
}

export { IDataEmail };
