import address from "../assets/data/address";

const Contact = () => {
  return (
    <div className="container text-slate-600 text-sm mx-auto p-4 md:p-10">
      <h1 className="text-lg font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {address.map((detail, index) => (
          <a
            key={index}
            href={detail.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <detail.icon className="text-xl text-sky-600 mr-4" />
            <div>
              <h2 className="text-sm font-medium">{detail.title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
