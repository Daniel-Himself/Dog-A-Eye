import React from 'react';

const Instructions = () => {

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Instructions</h2>
      <p style={styles.text}>
        Here are some guidelines on how to take a qualitative dog eye picture
      </p>
      <ol style={styles.list}>
        <li>Make sure the dog is calm and comfortable.</li>
        <li>Find a well-lit area, preferably with natural light.</li>
        <li>Avoid using flash.</li>
        <li>Capture the image with steady hands to avoid blurriness.</li>
      </ol>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px auto',
    padding: '20px',
    maxWidth: '600px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  list: {
    textAlign: 'left',
    marginLeft: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

export default Instructions;
