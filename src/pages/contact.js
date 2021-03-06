import React, { useState, useRef } from "react";
import { navigate } from "gatsby";
import Layout from "../shared/layout";
import ContactBox from "../components/kahntact";
import SEO from "../shared/seo";

function ContactPage() {
  const [state, setContactState] = useState({});
  const contactRef = useRef(null);

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = contactRef.current;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate("/"))
      .catch((error) => alert(error));
    setContactState({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <SEO
        keywords={[
          `fcdental`,
          `falls church dental`,
          `falls church dentist`,
          `falls church va`,
          `dr albert m boyce`,
          `albert m boyce dds`,
          `cerec dentistry`,
          `dental bridges`,
          `dental crowns`,
          `dental implants`,
          `dentures`,
          `general dentistry`,
          `teeth whitening`,
        ]}
        title="Contact"
      />

      <section className="flex flex-col h-full mx-4 mt-24 md:mt-32">
        <div className="flex flex-col items-center justify-around md:flex-row">
          <div className="flex flex-col md:w-1/4">
            <ContactBox />
          </div>
          <div className="flex flex-col w-full p-2 mb-2 rounded-lg shadow-lg md:w-1/2">
            <h1 className="mx-auto text-3xl border-b border-blue-300">
              Contact Us
            </h1>
            <form
              className="my-10"
              method="post"
              action="/"
              netlify-honeypot="bot-field"
              data-netlify="true"
              name="Contact"
              onSubmit={handleSubmit}
              ref={contactRef}
            >
              <input type="hidden" name="bot-field" onChange={handleChange} />
              <input type="hidden" name="form-name" value="Contact" />
              <label
                className="block mb-2 text-xs font-bold uppercase"
                htmlFor="name"
              >
                <span className="border-b border-blue-300">Name</span>
                <input
                  onChange={handleChange}
                  value={state.name}
                  name="name"
                  className="w-full mt-2 mb-6 bg-blue-100 form-input"
                  id="name"
                  type="text"
                />
              </label>

              <label
                className="block mb-2 text-xs font-bold uppercase"
                htmlFor="email"
              >
                <span className="border-b border-blue-300">Email</span>
                <input
                  onChange={handleChange}
                  value={state.email}
                  name="email"
                  className="w-full mt-2 mb-6 bg-blue-100 form-input"
                  id="email"
                  type="email"
                />
              </label>

              <label
                className="block mb-2 text-xs font-bold uppercase"
                htmlFor="message"
              >
                <span className="border-b border-blue-300">Message</span>
                <textarea
                  onChange={handleChange}
                  value={state.message}
                  name="message"
                  className="w-full mt-2 mb-6 bg-blue-100 form-textarea"
                  id="message"
                  rows="8"
                />
              </label>

              <span style={{ display: `grid`, placeItems: `center` }}>
                <button
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded shadow hover:border-blue-600 hover:bg-blue-600"
                  type="submit"
                >
                  Submit
                </button>
              </span>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;
