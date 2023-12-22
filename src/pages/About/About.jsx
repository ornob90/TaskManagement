import React from "react";
import Container from "../../components/shared/Container";

const About = () => {
  return (
    <Container className="mt-[100px]">
      <div className="mb-10  text-4xl font-bold">
        <h1>Know about us</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
        <div className="flex flex-col justify-center">
          <p>
            Welcome to TaskManagement, where efficiency meets excellence. At
            TaskManagement, we are on a mission to streamline your workflow and
            enhance productivity. Our dedicated team is committed to delivering
            top-notch task management solutions, ensuring that you can focus on
            what matters most. With a passion for innovation and a drive for
            perfection, we strive to make task management a seamless experience
            for individuals and teams alike. Join us on this journey towards
            optimal productivity and effective collaboration.
          </p>
        </div>
        <div className="">
          <img
            src="https://www.shutterstock.com/image-photo/tasks-word-on-wooden-cubes-260nw-1904598853.jpg"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </Container>
  );
};

export default About;
