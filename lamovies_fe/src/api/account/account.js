import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    Account: 'Account',
    ChangePassword: 'ChangePassword',
};
const ChangePasswordAPI = (passwordData) => {
    const { Id, Password, NewPassword } = passwordData;
    return axiosClient.post(
        `${END_POINT.Account}/${END_POINT.ChangePassword}`,
        {
            Id,
            Password,
            NewPassword,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};

export { ChangePasswordAPI };
