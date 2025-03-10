import { Session } from '@/domain/session/SessionType';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getSessions } from '@/network/api-routes/Session';

export const SessionContext = createContext<{
  session: Session | null;

  generateTicket: () => Promise<string | null>;
}>({
  session: null,
  generateTicket: () => Promise.resolve(null),
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    getSessions().then((data) => {
      setSessions(data);
    });
  }, []);

  const session = useCallback(() => {
    return (
      sessions.find(
        (session) =>
          new Date(session.endDate) >= new Date() &&
          new Date(session.startDate) <= new Date()
      ) ?? null
    );
  }, [sessions]);

  const generateTicket = (): Promise<string | null> => {
    return Promise.resolve()
      .then(() => {
        const currentSession = session();
        const tickets = currentSession?.tickets;

        if (!tickets || tickets.length === 0) {
          return null;
        }

        const randomIndex = Math.floor(Math.random() * tickets.length);
        return tickets[randomIndex].code || null;
      })
      .catch(() => null);
  };

  return (
    <SessionContext.Provider value={{ session: session(), generateTicket }}>
      {children}
    </SessionContext.Provider>
  );
};
