import env from '../../config/config'

export const employee = {
  email: 'qaautomation+tc2@namely.com',
  first_name: 'Elizabeth',
  last_name: 'Alanoori',
  password: 'IDK', // TODO: get from vault
};

export const employee_manager = {
  email: 'qaautomation+m1@namely.com',
  first_name: 'William',
  last_name: 'Abramson',
  password: 'IDK', // TODO: get from vault
};

export const administrator = {
  email: env.EMAIL,
  password: env.PASSWORD
};
