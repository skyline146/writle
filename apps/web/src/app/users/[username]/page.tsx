export default function UserProfile({ params }: PageProps) {
  const username = params.username;

  return <section>Username: {username}</section>;
}
