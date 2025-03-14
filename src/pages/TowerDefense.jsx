import React, { useState, useEffect, useRef } from 'react';
import './TowerDefense.css'; // Ensure this file exists

const TowerDefense = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(100);
  const [health, setHealth] = useState(100);
  const [wave, setWave] = useState(1);
  const [upgrades, setUpgrades] = useState({
    damage: { value: 1, cost: 50 },
    attackSpeed: { value: 1, cost: 50 },
    range: { value: 100, cost: 50 },
    health: { value: 100, cost: 50 },
    criticalChance: { value: 0.1, cost: 50 }, // 10% chance
    criticalFactor: { value: 2, cost: 50 }, // 2x damage
    multishotChance: { value: 0.1, cost: 50 }, // 10% chance
    multishotTargets: { value: 1, cost: 50 }, // Number of additional targets
    lifeSteal: { value: 0.01, cost: 50 }, // 1% life steal
  });

  const canvasRef = useRef(null);
  const enemiesRef = useRef([]);
  const projectilesRef = useRef([]);
  const enemyProjectilesRef = useRef([]); // Projectiles shot by triangle enemies
  const lastEnemyUpdateTimeRef = useRef(Date.now()); // Track the last update time for enemies
  const lastProjectileUpdateTimeRef = useRef(Date.now()); // Track the last update time for projectiles
  const lastEnemyProjectileUpdateTimeRef = useRef(Date.now()); // Track the last update time for enemy projectiles

  // Tower object
  const tower = {
    x: 300, // Center of the canvas (600px width / 2)
    y: 200, // Center of the canvas (400px height / 2)
    range: upgrades.range.value, // Use the range value from upgrades
  };

  // Start the game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setMoney(100);
    setHealth(100);
    setWave(1);
    enemiesRef.current = [];
    projectilesRef.current = [];
    enemyProjectilesRef.current = [];
    spawnEnemies();
  };

  // Spawn enemies outside the map
  const spawnEnemies = () => {
    const newEnemies = [];
    const enemyCount = wave * 10; // Increase enemy count per wave

    for (let i = 0; i < enemyCount; i++) {
      const angle = Math.random() * 2 * Math.PI; // Random angle
      const distance = 400 + Math.random() * 100; // Spawn outside the map
      const x = Math.cos(angle) * distance + tower.x; // X position relative to tower
      const y = Math.sin(angle) * distance + tower.y; // Y position relative to tower

      // Randomly choose enemy type
      const enemyType = Math.random();
      if (enemyType < 0.4) {
        // Rectangle Enemy (40% chance)
        newEnemies.push({
          id: Math.random().toString(36).substring(7),
          x,
          y,
          type: 'rectangle',
          health: 1 + wave * 5, // More health
          maxHealth: 1 + wave * 5,
          speed: 10 + wave * 2, // Slower
          reward: 20 + wave * 5, // Higher reward
          width: 20, // Bigger size
          height: 20,
        });
      } else if (enemyType < 0.7) {
        // Triangle Enemy (30% chance)
        newEnemies.push({
          id: Math.random().toString(36).substring(7),
          x,
          y,
          type: 'triangle',
          health: 1 + wave * 2, // Lower health
          maxHealth: 5 + wave * 2,
          speed: 30 + wave * 5, // Faster
          reward: 10 + wave * 5, // Lower reward
          size: 10, // Smaller size
          shootRange: 50, // Shooting range
          lastShootTime: 0, // Last time the enemy shot a projectile
        });
      } else {
        // Circle Enemy (30% chance)
        newEnemies.push({
          id: Math.random().toString(36).substring(7),
          x,
          y,
          type: 'circle',
          health: 1 + wave * 2, // Lower health
          maxHealth: 5 + wave * 2,
          speed: 50 + wave * 5, // Faster
          reward: 10 + wave * 5, // Lower reward
          radius: 10, // Smaller size
        });
      }
    }
    enemiesRef.current = [...enemiesRef.current, ...newEnemies];
  };

  // Move enemies towards the tower
  const moveEnemies = () => {
    const now = Date.now();
    const deltaTime = (now - lastEnemyUpdateTimeRef.current) / 1000; // Convert to seconds
    lastEnemyUpdateTimeRef.current = now;

    enemiesRef.current = enemiesRef.current.map((enemy) => {
      const dx = tower.x - enemy.x; // Distance to tower on X axis
      const dy = tower.y - enemy.y; // Distance to tower on Y axis
      const distance = Math.sqrt(dx * dx + dy * dy); // Total distance to tower
      const speed = enemy.speed;

      return {
        ...enemy,
        x: enemy.x + (dx / distance) * speed * deltaTime, // Move toward tower
        y: enemy.y + (dy / distance) * speed * deltaTime, // Move toward tower
      };
    });
  };

  // Check for collisions with the tower
  const checkCollisions = () => {
    enemiesRef.current = enemiesRef.current.filter((enemy) => {
      const dx = tower.x - enemy.x;
      const dy = tower.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 20) {
        setHealth((prevHealth) => prevHealth - (enemy.type === 'rectangle' ? 5 : 10)); // Rectangle deals less damage
        return false; // Remove enemy on collision
      }
      return true;
    });
  };

  // Shoot projectiles from the tower
  const shootProjectiles = () => {
    const enemiesInRange = enemiesRef.current.filter((enemy) => {
      const dx = tower.x - enemy.x;
      const dy = tower.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= tower.range; // Only shoot at enemies in range
    });

    if (enemiesInRange.length > 0) {
      const targets = enemiesInRange.slice(0, upgrades.multishotTargets.value); // Multishot targets
      targets.forEach((target) => {
        projectilesRef.current.push({
          id: Math.random().toString(36).substring(7),
          x: tower.x, // Start from the tower
          y: tower.y, // Start from the tower
          targetX: target.x,
          targetY: target.y,
          speed: 200, // Projectile speed
          damage: upgrades.damage.value * (Math.random() < upgrades.criticalChance.value ? upgrades.criticalFactor.value : 1), // Critical hit
        });
      });
    }
  };

  // Move projectiles
  const moveProjectiles = () => {
    const now = Date.now();
    const deltaTime = (now - lastProjectileUpdateTimeRef.current) / 1000; // Convert to seconds
    lastProjectileUpdateTimeRef.current = now;

    projectilesRef.current = projectilesRef.current
      .map((projectile) => {
        const dx = projectile.targetX - projectile.x;
        const dy = projectile.targetY - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = projectile.speed;

        return {
          ...projectile,
          x: projectile.x + (dx / distance) * speed * deltaTime, // Move toward target
          y: projectile.y + (dy / distance) * speed * deltaTime, // Move toward target
        };
      })
      .filter((projectile) => {
        const dx = projectile.targetX - projectile.x;
        const dy = projectile.targetY - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance > 5; // Remove projectile when close to target
      });
  };

  // Check for projectile hits
  const checkHits = () => {
    projectilesRef.current = projectilesRef.current.filter((projectile) => {
      const hitEnemy = enemiesRef.current.find((enemy) => {
        const dx = enemy.x - projectile.x;
        const dy = enemy.y - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 10;
      });
      if (hitEnemy) {
        hitEnemy.health -= projectile.damage;
        if (hitEnemy.health <= 0) {
          setMoney((prevMoney) => prevMoney + hitEnemy.reward); // Earn money for killing enemies
        }
        return false; // Remove projectile on hit
      }
      return true;
    });
  };

  // Check for dead enemies
  const checkDeadEnemies = () => {
    enemiesRef.current = enemiesRef.current.filter((enemy) => {
      if (enemy.health <= 0) {
        setScore((prevScore) => prevScore + 10);
        return false;
      }
      return true;
    });
  };

  // Triangle enemies shoot projectiles at the tower
  const shootEnemyProjectiles = () => {
    const now = Date.now();
    enemiesRef.current.forEach((enemy) => {
      if (enemy.type === 'triangle') {
        const dx = tower.x - enemy.x;
        const dy = tower.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the tower is within shooting range and enough time has passed
        if (distance <= enemy.shootRange && now - enemy.lastShootTime > 2000) { // Shoot every 2 seconds
          enemyProjectilesRef.current.push({
            id: Math.random().toString(36).substring(7),
            x: enemy.x, // Start from the enemy
            y: enemy.y, // Start from the enemy
            targetX: tower.x,
            targetY: tower.y,
            speed: 100, // Slower projectiles
            damage: 5, // Less damage
          });
          enemy.lastShootTime = now; // Update last shoot time
        }
      }
    });
  };

  // Move enemy projectiles
  const moveEnemyProjectiles = () => {
    const now = Date.now();
    const deltaTime = (now - lastEnemyProjectileUpdateTimeRef.current) / 1000; // Convert to seconds
    lastEnemyProjectileUpdateTimeRef.current = now;

    enemyProjectilesRef.current = enemyProjectilesRef.current
      .map((projectile) => {
        const dx = projectile.targetX - projectile.x;
        const dy = projectile.targetY - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = projectile.speed;

        return {
          ...projectile,
          x: projectile.x + (dx / distance) * speed * deltaTime, // Move toward tower
          y: projectile.y + (dy / distance) * speed * deltaTime, // Move toward tower
        };
      })
      .filter((projectile) => {
        const dx = projectile.targetX - projectile.x;
        const dy = projectile.targetY - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance > 5; // Remove projectile when close to target
      });
  };

  // Check for enemy projectile hits
  const checkEnemyProjectileHits = () => {
    enemyProjectilesRef.current = enemyProjectilesRef.current.filter((projectile) => {
      const dx = tower.x - projectile.x;
      const dy = tower.y - projectile.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 20) {
        setHealth((prevHealth) => prevHealth - projectile.damage); // Reduce tower health
        return false; // Remove projectile on hit
      }
      return true;
    });
  };

  // Game loop for enemies
  useEffect(() => {
    let animationFrameId;

    const enemyLoop = () => {
      if (gameState === 'playing') {
        moveEnemies();
        checkCollisions();
        checkDeadEnemies();

        if (enemiesRef.current.length === 0) {
          setWave((prevWave) => prevWave + 1);
          spawnEnemies();
        }

        if (health <= 0) {
          setGameState('gameOver');
        }

        // Request the next frame
        animationFrameId = requestAnimationFrame(enemyLoop);
      }
    };

    // Start the enemy loop
    animationFrameId = requestAnimationFrame(enemyLoop);

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, health]);

  // Game loop for projectiles
  useEffect(() => {
    let animationFrameId;

    const projectileLoop = () => {
      if (gameState === 'playing') {
        moveProjectiles();
        checkHits();

        // Request the next frame
        animationFrameId = requestAnimationFrame(projectileLoop);
      }
    };

    // Start the projectile loop
    animationFrameId = requestAnimationFrame(projectileLoop);

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  // Game loop for enemy projectiles
  useEffect(() => {
    let animationFrameId;

    const enemyProjectileLoop = () => {
      if (gameState === 'playing') {
        shootEnemyProjectiles(); // Shoot projectiles if conditions are met
        moveEnemyProjectiles();
        checkEnemyProjectileHits();

        // Request the next frame
        animationFrameId = requestAnimationFrame(enemyProjectileLoop);
      }
    };

    // Start the enemy projectile loop
    animationFrameId = requestAnimationFrame(enemyProjectileLoop);

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  // Render loop
  useEffect(() => {
    let animationFrameId;

    const renderLoop = () => {
      if (gameState === 'playing') {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the tower
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText('T', tower.x - 6, tower.y + 8);

        // Draw the range circle
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, upgrades.range.value, 0, Math.PI * 2); // Use upgrades.range.value
        ctx.stroke();

        // Draw enemies
        enemiesRef.current.forEach((enemy) => {
          if (enemy.type === 'circle') {
            ctx.fillStyle = '#f00';
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            ctx.fill();
          } else if (enemy.type === 'rectangle') {
            ctx.fillStyle = '#00f';
            ctx.fillRect(enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, enemy.width, enemy.height);
          } else if (enemy.type === 'triangle') {
            ctx.fillStyle = '#0f0';
            ctx.beginPath();
            ctx.moveTo(enemy.x, enemy.y - enemy.size);
            ctx.lineTo(enemy.x - enemy.size, enemy.y + enemy.size);
            ctx.lineTo(enemy.x + enemy.size, enemy.y + enemy.size);
            ctx.closePath();
            ctx.fill();

            // Draw shooting range circle
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.shootRange, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Draw health bar
          ctx.fillStyle = '#555';
          ctx.fillRect(enemy.x - 15, enemy.y - 20, 30, 5);
          ctx.fillStyle = '#0f0';
          ctx.fillRect(
            enemy.x - 15,
            enemy.y - 20,
            (enemy.health / enemy.maxHealth) * 30,
            5
          );
        });

        // Draw projectiles
        projectilesRef.current.forEach((projectile) => {
          ctx.fillStyle = '#ff0';
          ctx.beginPath();
          ctx.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw enemy projectiles
        enemyProjectilesRef.current.forEach((projectile) => {
          ctx.fillStyle = '#f0f';
          ctx.beginPath();
          ctx.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Request the next frame
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    // Start the render loop
    animationFrameId = requestAnimationFrame(renderLoop);

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, health, upgrades.range.value]); // Add upgrades.range.value to dependencies

  // Shoot projectiles at intervals
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(shootProjectiles, 1000 / upgrades.attackSpeed.value);
      return () => clearInterval(interval);
    }
  }, [gameState, upgrades.attackSpeed.value]);

  // Upgrade shop
  const upgradeAttribute = (attribute) => {
    const cost = upgrades[attribute].cost;
    if (money >= cost) {
      setUpgrades((prev) => ({
        ...prev,
        [attribute]: {
          value: prev[attribute].value + (attribute === 'range' ? 10 : attribute === 'criticalChance' || attribute === 'multishotChance' ? 0.05 : 1),
          cost: prev[attribute].cost * 2, // Double the cost
        },
      }));
      setMoney((prevMoney) => prevMoney - cost);
    }
  };

  return (
    <div className="tower-defense">
      {gameState === 'menu' && (
        <div className="game-menu">
          <h1>Tower Defense Game</h1>
          <p>Defend the tower from incoming enemies!</p>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-container">
          <div className="game-info">
            <p>Wave: {wave}</p>
            <p>Money: ${money}</p>
            <p>Health: {health}</p>
          </div>
          <canvas ref={canvasRef} width="600" height="400" className="game-area"></canvas>
          <div className="upgrade-shop">
            <h3>Upgrade Shop</h3>
            <div className="upgrade-grid">
              {Object.entries(upgrades).map(([key, { value, cost }]) => (
                <div key={key} className="upgrade-box">
                  <button onClick={() => upgradeAttribute(key)}>
                    {key} (${cost})
                  </button>
                  <p>Current: {value}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setGameState('menu')}>Back to Menu</button>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>
          <button onClick={startGame}>Restart</button>
          <button onClick={() => setGameState('menu')}>Exit to Menu</button>
        </div>
      )}
    </div>
  );
};

export default TowerDefense;