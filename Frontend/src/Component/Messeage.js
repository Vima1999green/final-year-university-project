import React from 'react';
import Alert from 'react-popup-alert';

const Message = ({ initialType, initialText }) => {
  const [alert, setAlert] = React.useState({
    type: initialType || 'error',
    text: initialText || 'This is an alert message',
    show: false
  });

  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    });
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: 'Demo alert',
      show: true
    });
  }

  React.useEffect(() => {
    // Update alert text and type when props change
    setAlert({
      type: initialType || 'error',
      text: initialText || 'This is an alert message',
      show: true
    });
  }, [initialType, initialText]);

  return (
    <div>
      <Alert
        header={'Header'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
    </div>
  );
};

export default Message;
