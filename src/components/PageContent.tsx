import classes from "./PageContent.module.css";
import React from "react";

type Content = {
  title: string;
  children: React.ReactNode;
};

function PageContent({ title, children }: Content) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
