import { getAllMembers } from "@/services/users/users.service";
import { GreenevilleBJJUser } from "@/types/users.types";
import { useEffect, useState } from "react";

export const useMembers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allMembers, setAllMembers] = useState<GreenevilleBJJUser[]>([]);

  const fetchMembers = async () => {
    try {
      getAllMembers().then((data) => {
        console.log(
          `🚀 ~ members.hooks.tsx:13 ~ getAllMembers ~ data: \n`,
          data
        );

        setAllMembers(data);
      });
    } catch (err) {
      console.error("Error loading members:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setIsLoading(false);
  }, []);

  return { isLoading, allMembers, fetchMembers };
};
