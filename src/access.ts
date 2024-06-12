/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: UserAPI.UserVO } | undefined) {
  const {currentUser} = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === 1
  };
}
