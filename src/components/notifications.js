import NotificationSystem from 'rc-notification';
import React from 'react';

const BasicNotification = ({ color, title, message, theme }) => (
  <div className={`notification notification--${color} notification--theme-light`}>
    <h5 className="notification__title bold-text">{title}</h5>
    <p className="notification__message">{message}</p>
  </div>
);

BasicNotification.defaultProps = {
  color: '',
  title: '',
  message: '',
};

const ImageNotification = ({ image, title, message, theme }) => (
  <div className={`notification notification--image notification--theme-light`}>
    <div className="notification__image">
      <img src={image} alt="" />
    </div>
    <h5 className="notification__title bold-text">{title}</h5>
    <p className="notification__message">{message}</p>
  </div>
);

ImageNotification.defaultProps = {
  color: '',
  title: '',
  message: '',
  image: '',
};

const FullWideNotification = ({ color, message }) => (
  <div className={`notification notification--full-wide notification--${color}`}>
    <p className="notification__message">{message}</p>
  </div>
);

FullWideNotification.defaultProps = {
  color: '',
  message: '',
};

const notifications = (() => {
  let notificationLU = null;
  let notificationRU = null;
  let notificationTC = null;

  const init = () => {
    NotificationSystem.newInstance({ style: { top: 65 } }, (n) => (notificationLU = n));
    NotificationSystem.newInstance({ style: { top: 65 } }, (n) => (notificationRU = n));
    NotificationSystem.newInstance({ style: { top: 65 } }, (n) => (notificationTC = n));
  };

  const destroyAll = () => {
    if (notificationLU) {
      notificationLU.destroy();
    }

    if (notificationRU) {
      notificationRU.destroy();
    }

    if (notificationLU) {
      notificationTC.destroy();
    }
  };

  const getNotificationContent = (config = {}) => {
    let html = '';

    //TODO : review layoutType  later
    if (config.layoutType === 'full') {
      html = (
        <FullWideNotification
          color={config.color || ''}
          // title={title || 'Success'}
          message={config.message || ''}
        />
      );
    } else if (config.layoutType === 'image') {
      html = (
        <ImageNotification
          color={config.color || ''}
          title={config.title || ''}
          message={config.message || ''}
          image={config.image || ''}
        />
      );
    } else {
      html = (
        <BasicNotification color={config.color || 'info'} title={config.title || ''} message={config.message || ''} />
      );
    }
    return html;
  };

  const show = (options = {}) => {
    if (!notificationRU) {
      return;
    }
    let defaultOptions = {
      type: 'basic',
      position: 'right-up',
      color: 'info',
      title: '',
      message: '',
      img: '',
      duration: 5,
      key: 'req-form',
    };

    const config = {
      ...defaultOptions,
      ...options,
    };

    // if (config['type'] === 'full') {
    //   config['position'] = 'full';
    // }

    // if (config['position'] !== 'full') {
    //   config['type'] = 'basic';
    // } else {
    //   config['type'] = 'full';
    // }

    if (config['type'] === 'error') {
      config['color'] = 'danger';
      config['title'] = config['title'] || 'Error';
    } else if (config['type'] === 'success') {
      config['color'] = 'success';
      config['title'] = config['title'] || 'Success';
    } else if (config['type'] === 'warning') {
      config['color'] = 'warning';
      config['title'] = config['title'] || 'Warning';
    } else {
      config['color'] = 'info';
      config['color'] = 'primary';
      config['title'] = config['title'] || 'Info';
    }

    let html = getNotificationContent(config);

    const notificationDefaultProps = {
      content: html,
      duration: config.duration,
      closable: true,
      className: `${config.position} ltr-support`,
    };

    if (config['key']) {
      notificationDefaultProps['key'] = config['key'];
    }

    // debugger;

    switch (config.position) {
      case 'left-up':
        // notificationLU.notice(notificationDefaultProps);
        // eslint-disable-next-line no-case-declarations
        // const leftUpNotificationIntervalKey = setInterval(() => {
        notificationLU.notice({
          ...notificationDefaultProps,
          content: html,
          style: { top: 0, left: 0 },
          className: `${config.position} ltr-support`,
          // onClose() {
          //   setTimeout(() => { clearInterval(leftUpNotificationIntervalKey); });
          // },
        });
        // }, 100);
        // setTimeout(() => { clearInterval(leftUpNotificationIntervalKey); }, 5000);
        break;
      case 'right-up':
        // notificationRU.notice(notificationDefaultProps);
        // eslint-disable-next-line no-case-declarations
        // const rightUpNotificationIntervalKey = setInterval(() => {
        notificationRU.notice({
          ...notificationDefaultProps,
          content: html,
          style: { top: 0, left: 'calc(100vw - 100%)' },
          className: `${config.position} ltr-support`,
          // onClose() {
          //   setTimeout(() => { clearInterval(rightUpNotificationIntervalKey); });
          // },
        });
        // }, 100);
        // setTimeout(() => { clearInterval(rightUpNotificationIntervalKey); }, 5000);
        break;
      default:
        console.log('\n\n-----------notification-default-start-----------------------');
        console.log('options-------->', options);
        console.log('defaultOptions------->', defaultOptions);
        console.log('notificationDefaultProps------>', defaultOptions);
        console.log('\n\n-----------/notification-default-start-----------------------');

        notificationTC.notice({
          ...notificationDefaultProps,
          style: { top: 0, left: 0 },
        });
        break;
    }
  };

  const reset = () => {
    destroyAll();
    init();
  };

//   const remove = (keys = []) => {
//     if (!Array.isArray(keys)) {
//       keys = [keys];
//     }

//     for (key of keys) {
//       if (notificationLU) {
//         notificationLU.removeNotice(key);
//       }

//       if (notificationRU) {
//         notificationRU.removeNotice(key);
//       }

//       if (notificationLU) {
//         notificationTC.removeNotice(key);
//       }
//     }
//   };

  return {
    show,
    // remove,
    reset,
  };
})();

export default notifications;
