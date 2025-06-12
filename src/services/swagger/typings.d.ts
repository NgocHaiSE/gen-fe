declare namespace API {
  type ApiResponse = {
    code?: number;
    type?: string;
    message?: string;
  };

  type Category = {
    id?: number;
    name?: string;
  };

  type deleteOrderParams = {
    /** ID of the order that needs to be deleted */
    orderId: number;
  };

  type deleteUserParams = {
    /** The name that needs to be deleted */
    username: string;
  };

  type getUserByNameParams = {
    /** The name that needs to be fetched. Use user1 for testing.  */
    username: string;
  };

  type loginUserParams = {
    /** The user name for login */
    username: string;
    /** The password for login in clear text */
    password: string;
  };

  type Order = {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type updateUserParams = {
    /** name that need to be updated */
    username: string;
  };

  type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };
}
