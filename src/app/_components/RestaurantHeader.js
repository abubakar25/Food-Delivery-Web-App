"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    }

    if (data) {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };
  return (
    <>
      <div className="header-wrapper">
        <div>
          <img
            style={{ width: 100 }}
            src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
          />
        </div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          {details && details.name ? (
            <>
              <li>
                <Link href="/">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/">login/SignUp</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default RestaurantHeader;
