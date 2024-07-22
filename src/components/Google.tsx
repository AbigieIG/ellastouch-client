const GoogleMap = ({ height, width }: { height: number | string; width: number | string }) => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5238250220496!2d3.253147475218611!3d6.4551121239538265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b87793408f19d%3A0xc60858a1804c5383!2sPetrocam%20Filling%20Station%20Satellite!5e0!3m2!1sen!2sng!4v1721006391990!5m2!1sen!2sng"
        width={width}
        height={height}
        style={{ border: 1 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
