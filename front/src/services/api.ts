export const getEmployees = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users/employees`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des employés');
  }
  return response.json();
};

export const createEmployee = async (employeeData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/users/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'employé");
  }
  return response.json();
};

export const deleteEmployee = async (employeeId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/users/employees/${employeeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'employé");
  }
};
