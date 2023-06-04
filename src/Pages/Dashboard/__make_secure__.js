/****
 * ------------------
 *  Basic security
 * ------------------
 * 1. don't show the link to those who should not see, it should only be visiable to the person who is authorized for it
 * 2. do not allow to visit the link by typing on the url
 * so use AdminRoute to check wheather the user is admin or not
 * 
 * ---------------------------
 *  To send data to the server
 * ---------------------------
 * 1. verify jwt token (send authorization token in the header to the server)
 *    use axios if possible to send jwt token by intercepting the request.
 * 2. if it is an admin activity make sure that only admin is posting data by using verifyAdmin Function
 * 
 * 
 * **/  