import { useEffect, useState } from "preact/hooks";
import {
  getTopHonorableUsers,
  type TopHonorableUserDto,
} from "../api/profile.api";
import ProfileCard from "../components/ProfileCard.tsx";

export default function TopHonorableList() {
  const [honorables, setHonorables] = useState<TopHonorableUserDto[]>([]);

  useEffect(() => {
    getTopHonorableUsers().then(([data]) => {
      if (data !== null) {
        setHonorables(data!);
      }
    });
  }, []);

  return (
    <>
      <h3 class="text-xl font-bold mb-2 mt-5">En Saygıdeğerler</h3>
      <div class="flex gap-4 overflow-y-scroll">
        {honorables.map((honorable) => (
          <ProfileCard {...honorable} />
        ))}
      </div>
      {honorables.length === 0 && (
        <p class="text-center text-gray-500 mt-5">
          Henüz hiç kimse saygıdeğer değil. İlk saygıdeğer kişi sen olabilir
          misin?
        </p>
      )}
    </>
  );
}
