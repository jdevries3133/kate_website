import { useLoaderData } from "remix";
import prisma from "~/prisma.server";

export const loader = () => {
  return prisma.userProfile.findMany({
    include: {
      _count: {
        select: {
          Comments: true
        }
      }
    }
  });
};

export default function Profiles() {
  const data = useLoaderData<ReturnType<typeof loader>>();

  return (
    <table className="table">
      <thead>
        <tr>
          <td>id</td>
          <td>name</td>
          <td>email</td>
          <td>created</td>
          <td># comments</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, email, created, _count }) => (
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{created}</td>
            <td>{_count.Comments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
