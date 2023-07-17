import Footer from "./Footer";

const ContactUsPage = () => {
  return (
    <>
      <div className="main h-screen">
        <div className="flex justify-center items-center mt-0 px-4 py-10">
          <div className="bg-[#1B1B1B] p-8 shadow-lg w-full md:max-w-5xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
            <form className="flex flex-col gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border-b border-gray-300 p-2 w-full bg-transparent"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2  text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-gray-300 p-2 w-full bg-transparent"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4 text-white">
                <label htmlFor="message" className="block mb-2  text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  className="border-b border-gray-300 placeholder-white p-2 w-full h-32 resize-none bg-transparent"
                  placeholder="Your message"
                ></textarea>
              </div>
              <a
                href="mailto:Weberlabs.info@gmail.com"
                className="bg-[#454545] w-fit text-white py-2 px-4"
              >
                Submit
              </a>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;
