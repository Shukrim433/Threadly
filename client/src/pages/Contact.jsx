import React from "react";
import Title from "../components/Title/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src="/images/contact_img.jpg"
          alt="clothes on a rack"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Tel: (123) 456-789-1011 <br /> Email: threadly@email.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
