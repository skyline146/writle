export default function UserProfile({ params }: PageProps) {
  console.log(params);
  return <section>User ID: {params.slug}</section>;
}
