import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  //maxWidth: '500px',
  borderRadius: '7px'
};

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

export default ({ post: { title, searchkeys, body, price, image, id }, onEdit, onDelete }) => {
  return (
    <div style={ styles }>
      <h2>{ title }</h2>
      <p>{ searchkeys }</p>
      <p>{ addLineBreaks(body) }</p>
      <p>{ price } €</p>
      <p>{ image }</p>
      <button className="btn btn-primary" type="button" onClick={() => onEdit(id)}>Edit</button>
      <button className="btn btn-danger" type="button" onClick={() => onDelete(id)}>Remove</button>
    </div>
  );
};
