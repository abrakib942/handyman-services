import React from "react";
import { Button } from "antd";

const CustomButton = ({ children, htmlType, onClick, ...rest }: any) => {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: "#FBD232",
        borderColor: "#FBD232",
        color: "black",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
