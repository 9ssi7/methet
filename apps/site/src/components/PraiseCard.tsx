interface Props {
  to_user_name: string;
  to_user_avatar_url: string;
  message: string;
  created_at: string;
}

export default function PraiseCard({
  to_user_name,
  to_user_avatar_url,
  message,
  created_at,
}: Props) {
  const formatter = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div class="w-full bg-second rounded-md gap-2 p-2">
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <img
            src={to_user_avatar_url}
            alt={to_user_name}
            class="w-12 h-12 rounded-full"
          />
          <div class="flex flex-col">
            <span class="text-lg font-bold">{to_user_name}</span>
            <span class="text-sm text-gray-500">
              anonim birisi tarafından övüldü
            </span>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <time datetime={created_at} class="text-sm text-gray-500">
            {formatter.format(new Date(created_at))}
          </time>
        </div>
      </div>
      <p class="text-lg mt-4 mb-2 text-wrap">{message}</p>
    </div>
  );
}
