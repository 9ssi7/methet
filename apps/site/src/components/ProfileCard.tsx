interface Props {
  user_name: string;
  avatar_url: string;
  praise_count: number;
}

export default function ProfileCard({
  user_name,
  avatar_url,
  praise_count,
}: Props) {
  return (
    <a
      href={`/${user_name}`}
      class="flex min-w-max gap-2 relative bg-second border hover:brightness-110 duration-200 transition-colors rounded-md p-2"
    >
      <img src={avatar_url} alt={user_name} class="w-12 h-12 rounded-full" />
      <div class="flex flex-col">
        <span class="text-lg font-bold">{user_name}</span>
        <span class="text-sm text-gray-500">{praise_count} praises</span>
      </div>
    </a>
  );
}
