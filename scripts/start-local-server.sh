#!/bin/bash

# Script para iniciar servidor local de desenvolvimento
echo "🚀 Iniciando servidor local..."

# Verificar se o servidor já está rodando
if curl -s http://localhost:3333 > /dev/null; then
    echo "✅ Servidor já está rodando em http://localhost:3333"
    exit 0
fi

# Verificar se existe um servidor Node.js
if command -v node &> /dev/null; then
    echo "📦 Node.js encontrado"
    
    # Verificar se existe package.json com script start
    if [ -f "package.json" ]; then
        echo "🔧 Iniciando servidor com npm start..."
        npm start &
        SERVER_PID=$!
        echo "🆔 PID do servidor: $SERVER_PID"
        
        # Aguardar servidor iniciar
        echo "⏳ Aguardando servidor iniciar..."
        for i in {1..30}; do
            if curl -s http://localhost:3333 > /dev/null; then
                echo "✅ Servidor iniciado com sucesso!"
                echo "🌐 URL: http://localhost:3333"
                exit 0
            fi
            sleep 1
        done
        
        echo "❌ Servidor não iniciou em 30 segundos"
        kill $SERVER_PID 2>/dev/null
        exit 1
    else
        echo "❌ package.json não encontrado"
        exit 1
    fi
else
    echo "❌ Node.js não encontrado"
    echo "💡 Instale Node.js para usar servidor local"
    exit 1
fi
