import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const initialStaff = [
  { id: 1, name: 'Samuel O.', salary: 120000, status: 'Active' },
  { id: 2, name: 'Amina F.', salary: 95000, status: 'Active' },
  { id: 3, name: 'Joseph K.', salary: 108000, status: 'Active' },
];

const initialCustomers = [
  { id: 1, name: 'Grace N.', service: 'Laptop repair', duration: '2h 15m', spent: 52000, arrival: '09:30 AM' },
  { id: 2, name: 'David E.', service: 'Printing & scanning', duration: '1h 05m', spent: 18000, arrival: '11:00 AM' },
  { id: 3, name: 'Esther M.', service: 'Computer sale', duration: '3h 00m', spent: 250000, arrival: '01:20 PM' },
];

export default function Dashboard() {
  const location = useLocation();
  const [role, setRole] = useState('Owner');
  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem('innovatechStaff');
    return saved ? JSON.parse(saved) : initialStaff;
  });
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('innovatechCustomers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });
  const [managerRecords, setManagerRecords] = useState(() => {
    const saved = localStorage.getItem('innovatechManagerRecords');
    return saved ? JSON.parse(saved) : [];
  });
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('innovatechBalance');
    return saved ? parseInt(saved, 10) : 12500000000;
  });
  const [shareholders, setShareholders] = useState(() => {
    const saved = localStorage.getItem('innovatechShareholders');
    return saved ? JSON.parse(saved) : ['David', 'Amos', 'Williams', 'Divine', 'Felix'];
  });
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffSalary, setNewStaffSalary] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', service: '', duration: '', spent: '' });
  const [showInvestForm, setShowInvestForm] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentMessage, setInvestmentMessage] = useState('');
  const [newShareholderName, setNewShareholderName] = useState('');
  const [shareholderMessage, setShareholderMessage] = useState('');
  const [showStaffControls, setShowStaffControls] = useState(false);

  useEffect(() => {
    const savedRole = location.state?.role || localStorage.getItem('innovatechRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, [location.state]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('innovatechRole', role);
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem('innovatechBalance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('innovatechStaff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('innovatechCustomers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('innovatechManagerRecords', JSON.stringify(managerRecords));
  }, [managerRecords]);

  useEffect(() => {
    localStorage.setItem('innovatechShareholders', JSON.stringify(shareholders));
  }, [shareholders]);

  const formatBalance = (value) => {
    if (value >= 1000000000) {
      return `₦${(value / 1000000000).toFixed(1)}B`;
    }
    return `₦${value.toLocaleString()}`;
  };

  const visibleCustomers = role === 'Manager' ? managerRecords : customers;
  const visibleDailyRevenue = visibleCustomers.reduce((sum, customer) => sum + customer.spent, 0);
  const ownerDailyRevenue = managerRecords.reduce((sum, customer) => sum + customer.spent, 0);
  const dailyRevenue = customers.reduce((sum, customer) => sum + customer.spent, 0);
  const monthlyRevenue = dailyRevenue * 24;
  const yearlyRevenue = dailyRevenue * 300;

  const updateSalary = (id, delta) => {
    setStaff((current) =>
      current.map((member) =>
        member.id === id
          ? { ...member, salary: Math.max(0, member.salary + delta) }
          : member
      )
    );
    setBalance((current) => current - delta);
  };

  const handleInvest = () => {
    const amount = parseInt(investmentAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      setInvestmentMessage('Enter a valid investment amount.');
      return;
    }

    setBalance((current) => current + amount);
    setInvestmentMessage(`You invested ₦${amount.toLocaleString()} successfully.`);
    setInvestmentAmount('');
    setShowInvestForm(false);
  };

  const addShareholder = () => {
    const name = newShareholderName.trim();
    const formatted = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    if (!formatted) {
      setShareholderMessage('Enter a valid shareholder name.');
      return;
    }
    if (shareholders.length >= 5) {
      setShareholderMessage('Maximum of 5 shareholders reached.');
      return;
    }
    if (shareholders.some((item) => item.toLowerCase() === formatted.toLowerCase())) {
      setShareholderMessage('This shareholder already exists.');
      return;
    }

    setShareholders((current) => [...current, formatted]);
    setNewShareholderName('');
    setShareholderMessage(`${formatted} was added to the shareholder list.`);
  };

  const suspendStaff = (id) => {
    setStaff((current) =>
      current.map((member) =>
        member.id === id
          ? { ...member, status: member.status === 'Suspended' ? 'Active' : 'Suspended' }
          : member
      )
    );
  };

  const fireStaff = (id) => {
    setStaff((current) => current.filter((member) => member.id !== id));
  };

  const addStaff = () => {
    const salaryValue = parseInt(newStaffSalary, 10);
    if (!newStaffName.trim() || isNaN(salaryValue) || salaryValue <= 0) {
      return;
    }

    setStaff((current) => [
      ...current,
      { id: current.length + 1, name: newStaffName.trim(), salary: salaryValue, status: 'Active' },
    ]);
    setNewStaffName('');
    setNewStaffSalary('');
    setShowStaffControls(true);
  };

  const addCustomer = () => {
    const spentValue = parseInt(newCustomer.spent, 10);
    if (!newCustomer.name.trim() || !newCustomer.service.trim() || !newCustomer.duration.trim() || isNaN(spentValue) || spentValue <= 0) {
      return;
    }

    const customerRecord = {
      id: customers.length + managerRecords.length + 1,
      name: newCustomer.name.trim(),
      service: newCustomer.service.trim(),
      duration: newCustomer.duration.trim(),
      spent: spentValue,
      arrival: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCustomers((current) => [...current, customerRecord]);

    if (role === 'Manager') {
      setManagerRecords((current) => [...current, customerRecord]);
    }

    setNewCustomer({ name: '', service: '', duration: '', spent: '' });
  };

  const removeCustomer = (id) => {
    setCustomers((current) => current.filter((customer) => customer.id !== id));
    setManagerRecords((current) => current.filter((customer) => customer.id !== id));
  };

  if (role === 'Manager') {
    return (
      <div style={styles.container}>
        <div style={styles.headerManager}>
          <div>
            <h2>Manager Dashboard</h2>
            <p>Detailed customer records, staff salary controls, and company account balance for daily operations.</p>
          </div>
          <div style={styles.stats}>Customers • Staff • Balances</div>
        </div>

        <section style={styles.summaryRow}>
          <div style={styles.summaryCardBlue}>
            <h3>Total Customers</h3>
            <p>{managerRecords.length}</p>
          </div>
          <div style={styles.summaryCardGreen}>
            <h3>Staff Count</h3>
            <p>{staff.length}</p>
          </div>
          <div style={styles.summaryCardGold}>
            <h3>Company Balance</h3>
            <p>{formatBalance(balance)}</p>
          </div>
        </section>

        <section style={styles.block}>
          <h3>Customer Records</h3>
          {managerRecords.length > 0 ? (
            <div style={styles.recordList}>
              {managerRecords.map((customer) => (
                <div key={customer.id} style={styles.recordItem}>
                  <div style={styles.recordTop}>
                    <strong>{customer.name}</strong>
                    <button type="button" onClick={() => removeCustomer(customer.id)} style={styles.removeButton}>Remove</button>
                  </div>
                  <span><strong>Service:</strong> {customer.service}</span>
                  <span><strong>Time spent:</strong> {customer.duration}</span>
                  <span><strong>Amount paid:</strong> ₦{customer.spent.toLocaleString()}</span>
                  <span><strong>Arrival:</strong> {customer.arrival}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.emptyState}>No customer records yet. Add a customer to begin.</p>
          )}
        </section>

        <section style={styles.block}>
          <h3>Add Customer</h3>
          <div style={styles.formGrid}>
            <input
              type="text"
              placeholder="Customer name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Service provided"
              value={newCustomer.service}
              onChange={(e) => setNewCustomer({ ...newCustomer, service: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Time spent (e.g. 1h 30m)"
              value={newCustomer.duration}
              onChange={(e) => setNewCustomer({ ...newCustomer, duration: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Amount paid"
              value={newCustomer.spent}
              onChange={(e) => setNewCustomer({ ...newCustomer, spent: e.target.value })}
              style={styles.input}
            />
            <button type="button" onClick={addCustomer} style={styles.addButton}>Add Customer</button>
          </div>
        </section>

        <section style={styles.block}>
          <h3>Staff Salary Control</h3>
          <button type="button" onClick={() => setShowStaffControls((current) => !current)} style={styles.addButton}>
            {showStaffControls ? 'Hide Staff Controls' : 'Show Staff Controls'}
          </button>
          {showStaffControls && (
            <div style={styles.staffGrid}>
              {staff.map((member) => (
                <div key={member.id} style={styles.staffCard}>
                  <h4>{member.name}</h4>
                  <p>Status: {member.status}</p>
                  <p>Salary: ₦{member.salary.toLocaleString()}</p>
                  <div style={styles.staffButtons}>
                    <button
                      type="button"
                      onClick={() => updateSalary(member.id, 5000)}
                      style={styles.salaryButton}
                      disabled={member.status === 'Suspended'}
                    >
                      Increase
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSalary(member.id, -5000)}
                      style={{ ...styles.salaryButton, background: '#ef4444' }}
                      disabled={member.status === 'Suspended'}
                    >
                      Reduce
                    </button>
                    <button
                      type="button"
                      onClick={() => suspendStaff(member.id)}
                      style={{ ...styles.salaryButton, background: '#f59e0b' }}
                    >
                      {member.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                    </button>
                    <button
                      type="button"
                      onClick={() => fireStaff(member.id)}
                      style={{ ...styles.salaryButton, background: '#dc2626' }}
                    >
                      Fire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.block}>
          <h3>Add Staff</h3>
          <div style={styles.addStaffRow}>
            <input
              type="text"
              placeholder="Staff name"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Salary"
              value={newStaffSalary}
              onChange={(e) => setNewStaffSalary(e.target.value)}
              style={styles.input}
            />
            <button type="button" onClick={addStaff} style={styles.addButton}>Add Staff</button>
          </div>
        </section>
      </div>
    );
  }

  if (role === 'Shareholder') {
    return (
      <div style={styles.container}>
        <div style={styles.headerShareholder}>
          <div>
            <h2>Shareholder Governance Hub</h2>
            <p>Active oversight, investment rights, and governance roles for Innovatech shareholders.</p>
          </div>
          <div style={styles.shareholderHeaderRight}>
            <button
              type="button"
              style={styles.investButton}
              onClick={() => {
                setShowInvestForm((current) => !current);
                setInvestmentMessage('');
              }}
            >
              Invest
            </button>
          </div>
        </div>
        {showInvestForm && (
          <section style={styles.block}>
            <h3>Invest in Innovatech</h3>
            <div style={styles.investForm}>
              <input
                type="number"
                min="1000"
                placeholder="Amount to invest (₦)"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                style={styles.input}
              />
              <button type="button" onClick={handleInvest} style={{ ...styles.addButton, minWidth: '160px' }}>
                Confirm Investment
              </button>
            </div>
            {investmentMessage && <p style={styles.investMessage}>{investmentMessage}</p>}
          </section>
        )}

        <section style={styles.summaryRow}>
          <div style={styles.summaryCardBlue}>
            <h3>Governance Role</h3>
            <p>Vote on major business decisions, approve board leadership, and review annual reports.</p>
          </div>
          <div style={styles.summaryCardGreen}>
            <h3>Investment Role</h3>
            <p>Monitor dividend distributions, capital growth, and reinvestment strategy.</p>
          </div>
          <div style={styles.summaryCardGold}>
            <h3>Active Shareholder</h3>
            <p>Engage with board communication, exercise rights, and ensure corporate accountability.</p>
          </div>
        </section>

        <section style={styles.block}>
          <h3>Key Shareholder Responsibilities</h3>
          <ul style={styles.list}> 
            <li>Approve strategic direction, mergers, and major capital expenditure.</li>
            <li>Elect and remove board members during annual general meetings.</li>
            <li>Review financial results and ensure responsible use of shareholder funds.</li>
            <li>Support sustainable growth and long-term value creation.</li>
          </ul>
        </section>

        <section style={styles.block}>
          <h3>Rights of Shareholders</h3>
          <ul style={styles.list}>
            <li>Right to vote on board appointments and corporate resolutions.</li>
            <li>Right to receive dividends when declared by the board.</li>
            <li>Right to inspect corporate records and attend shareholder meetings.</li>
            <li>Right to influence governance through active oversight.</li>
          </ul>
        </section>

        <section style={styles.block}>
          <h3>Active Investment Body</h3>
          <p>As a shareholder, your role is both financial and governance-focused. You actively watch capital deployment, approve strategic investments, and protect shareholder value.</p>
          <p>Use this space to stay engaged with company performance and the evolving governance agenda.</p>
        </section>

        <section style={styles.block}>
          <div style={styles.blockHeader}>
            <h3>Available Shareholders</h3>
            <button type="button" onClick={addShareholder} style={styles.addButton} disabled={shareholders.length >= 5}>
              Add Shareholder
            </button>
          </div>
          <ul style={styles.list}>
            {shareholders.map((name) => (
              <li key={name} style={styles.shareholderItem}>{name}</li>
            ))}
          </ul>
          <div style={styles.investForm}>
            <input
              type="text"
              placeholder="New shareholder name"
              value={newShareholderName}
              onChange={(e) => setNewShareholderName(e.target.value)}
              style={styles.input}
              disabled={shareholders.length >= 5}
            />
          </div>
          {shareholderMessage && <p style={styles.investMessage}>{shareholderMessage}</p>}
          <p style={styles.helperText}>Only these shareholders may login with the pattern name.share.ng.</p>
        </section>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>Owner Dashboard</h2>
          <p>Daily, monthly, and yearly business records with worker count and executive metrics for INNOVATECH Plc.</p>
        </div>
        <div style={styles.headerRight}> 
          <span style={styles.balanceLabelLarge}>{formatBalance(balance)}</span>
        </div>
      </div>

      <section style={styles.recordSection}>
        <div style={styles.recordCard}>
          <div style={styles.recordCardHeader}>
            <h3>Manager Customer Records</h3>
          </div>
          <p>Live customer details from the manager dashboard.</p>
          <p>Total customers: {managerRecords.length}</p>
          <p>Total revenue: {formatBalance(ownerDailyRevenue)}</p>
          {managerRecords.length > 0 ? (
            <div style={styles.recordList}>
              {managerRecords.map((customer) => (
                <div key={customer.id} style={styles.recordItem}>
                  <div style={styles.recordTop}>
                    <strong>{customer.name}</strong>
                    <span>₦{customer.spent.toLocaleString()}</span>
                  </div>
                  <span><strong>Service:</strong> {customer.service}</span>
                  <span><strong>Duration:</strong> {customer.duration}</span>
                  <span><strong>Arrival:</strong> {customer.arrival}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.emptyState}>No manager customer records yet. Waiting for manager additions.</p>
          )}
        </div>
      </section>

      <section style={styles.summarySection}>
        <div style={styles.summaryCard}>
          <h3>Workers on Staff</h3>
          <p>Total staff count: {staff.length}</p>
          <p>Active workers: {staff.filter((member) => member.status === 'Active').length}</p>
          <p>Suspended workers: {staff.filter((member) => member.status === 'Suspended').length}</p>
        </div>
        <div style={styles.summaryCard}>
          <h3>Owner Insights</h3>
          <p>Business health, shop productivity, customer satisfaction, and capital planning metrics all in one place.</p>
          <p>Recommended focus: increase computer sales by 12% and expand cyber café hours for peak demand.</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, #0f172a, #1d4ed8)', color: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 18px 50px rgba(15, 23, 42, 0.15)' },
  headerRight: { display: 'flex', alignItems: 'center' },
  balanceLabelLarge: { fontSize: '1.35rem', fontWeight: '800', letterSpacing: '0.02em' },
  headerManager: { display: 'flex', flexDirection: 'column', gap: '1rem', background: 'linear-gradient(135deg, #0f172a, #047857)', color: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 18px 50px rgba(15, 23, 42, 0.15)' },
  headerShareholder: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, #0f172a, #8b5cf6)', color: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 18px 50px rgba(15, 23, 42, 0.15)' },
  shareholderHeaderRight: { display: 'flex', alignItems: 'center' },
  stats: { marginTop: '1rem', fontWeight: '700', letterSpacing: '0.06em' },
  recordSection: { display: 'grid', gap: '1rem', marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' },
  recordCard: { background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' },
  recordCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' },
  balanceLabel: { fontSize: '1.2rem', fontWeight: '700', color: '#1d4ed8' },
  summarySection: { display: 'grid', gap: '1rem', marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' },
  summaryCard: { background: '#eef2ff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' },
  summaryRow: { display: 'grid', gap: '1rem', marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' },
  summaryCardBlue: { background: '#eef2ff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' },
  summaryCardGreen: { background: '#dcfce7', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' },
  summaryCardGold: { background: '#fff7ed', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' },
  block: { marginTop: '1.5rem', background: '#ffffff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)' },
  list: { marginTop: '1rem', paddingLeft: '1.3rem', display: 'grid', gap: '0.75rem' },
  recordList: { display: 'grid', gap: '1rem' },
  recordItem: { padding: '1rem', borderRadius: '12px', background: '#f8fafc', display: 'grid', gap: '0.5rem' },
  recordTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' },
  removeButton: { padding: '0.5rem 0.85rem', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' },
  emptyState: { padding: '1rem', background: '#f8fafc', borderRadius: '12px', color: '#334155' },
  staffGrid: { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' },
  staffCard: { padding: '1.25rem', borderRadius: '16px', background: '#eef2ff', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' },
  staffButtons: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' },
  salaryButton: { padding: '0.65rem 1rem', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' },
  addStaffRow: { display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'center', marginTop: '1rem' },
  blockHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' },
  shareholderItem: { background: '#f8fafc', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1' },
  helperText: { marginTop: '1rem', color: '#334155' },
  salaryButtonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  formGrid: { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '1rem' },
  input: { padding: '0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' },
  addButton: { padding: '0.95rem 1.25rem', borderRadius: '10px', border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer' },
  investButton: { padding: '0.85rem 1.25rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', fontWeight: '700' },
  investForm: { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '1rem' },
  investMessage: { marginTop: '1rem', color: '#065f46', background: '#dcfce7', padding: '0.85rem 1rem', borderRadius: '12px' }
};